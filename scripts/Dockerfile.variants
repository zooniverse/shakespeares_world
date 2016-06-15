FROM ruby:2.3

RUN gem install aws-sdk pry
COPY create_variants_files.rb /usr/local/bin/
ENTRYPOINT [ "/usr/local/bin/create_variants_files.rb" ]
