#!/usr/bin/env ruby
require 'csv'
require 'pry'
require 'aws-sdk'
require 'uri'

variants = {}
created = 0

if ARGV.count != 2
  puts "Usage: ./create_variants_files.rb input_file output_dir"
  exit
end

INPUT_FILE = ARGV[0]
OUTPUT_DIR = ARGV[1]

CSV.foreach(INPUT_FILE, :encoding => "UTF-8") do |row|
  word, start_date = row[0, 2]
  row[2..-1].each do |variant|
    if not variant
      next
    end
    lower_variant = variant.downcase
    entry = "#{start_date}:#{word}"
    if variants.has_key?(lower_variant)
      unless variants[lower_variant].split.include?(entry)
        entry = "#{variants[lower_variant]}\n#{entry}"
      end
    end
    variants[lower_variant] = entry
  end
end

variants.each_with_index do |(key, data), index|
  puts "Up to entry: #{index}" if index % 1000 == 0

  ##create a file for use with s3 cli sync tool
  file_path = "#{OUTPUT_DIR}/#{key}.txt"
  dirname = File.dirname(file_path)
  unless File.directory?(dirname)
    FileUtils.mkdir_p(dirname)
  end
  File.write(file_path, data)
  created += 1
end

puts "Created: #{created} files"
