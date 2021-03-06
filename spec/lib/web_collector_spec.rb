# frozen_string_literal: true

require_relative '../../app/lib/web_collector'
require 'spec_helper'
require 'webmock/rspec'

RSpec.describe WebCollector do
  describe 'given valid url' do
    before(:each) do
      stub_request(:any, /.*/)
        .to_return(status: 200, body: '', headers: { content_length: 1337 })
    end

    it 'should collect an image' do
      item = WebCollector.new('https://example.com/img.jpg').collect

      expect(item).to include(
        categories: include('example.com', 'jpg', 'image'),
        mediatype: 'image'
      )
    end

    it 'should collect audio' do
      item = WebCollector.new('https://example.com/sweet_beats.ogg').collect

      expect(item).to include(
        categories: include('example.com', 'ogg', 'audio'),
        mediatype: 'audio'
      )
    end

    it 'should collect a video' do
      item = WebCollector.new('https://example.com/vid.mp4').collect

      expect(item).to include(
        categories: include('example.com', 'mp4', 'video'),
        mediatype: 'video'
      )
    end

    it 'should collect a youtube-video' do
      item = WebCollector.new(
        'https://www.youtube.com/watch?v=D-UmfqFjpl0'
      ).collect

      expect(item).to include(
        categories: include('youtube.com', 'youtube'),
        mediatype: 'youtube'
      )
    end

    it 'should collect a shortened youtube-link' do
      item = WebCollector.new(
        'https://youtu.be/D-UmfqFjpl0'
      ).collect

      expect(item).to include(
        categories: include('youtu.be', 'youtube'),
        mediatype: 'youtube'
      )
    end

    it 'should not collect hostname of ip address' do
      item = WebCollector.new(
        'https://10.0.0.1/image.jpg'
      ).collect

      expect(item).to include(
        categories: %w[jpg image],
        mediatype: 'image'
      )
    end

    it 'should collect an image with query parameters' do
      stub_request(:any, /img\.jpg/)
        .to_return(status: 403, body: 'Not validated')
      stub_request(:any, /img\.jpg\?validated=true/)
        .to_return(status: 200)

      item = WebCollector.new('http://www.example.com/img.jpg?validated=true')

      expect(item).to be_valid
      expect(item.collect).to include(
        categories: include('example.com', 'jpg', 'image'),
        mediatype: 'image'
      )
    end

    it "should confirm it's valid" do
      uri = 'https://example.com/cute_kitten.jpg'

      item = WebCollector.new(uri)

      expect(item).to be_valid
      expect(WebMock).to have_requested(:head, uri).once
    end
  end

  describe 'given invalid url' do
    before(:each) do
      stub_request(:any, /.*/)
        .to_return(status: 404)
    end

    it "should confirm it's invalid" do
      uri = 'https://example.com/not_cute_kitten.jpg'

      item = WebCollector.new(uri)

      expect(item).to_not be_valid
      expect(WebMock).to have_requested(:head, uri).once
    end

    it 'should raise error on invalid media type' do
      item = WebCollector.new('https://example.com/juicy.spunk')

      expect { item.collect }.to raise_error(WebCollector::InvalidType)
    end

    it 'should be invalid for non-existent host' do
      expect_any_instance_of(Net::HTTP)
        .to receive(:request_head)
        .and_raise(SocketError.new)

      item = WebCollector.new('https://example.com/juicy.spunk')

      expect(item).not_to be_valid
    end
  end
end
