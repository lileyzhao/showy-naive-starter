FROM nginx:1.22.0

COPY dist/ /usr/share/nginx/html/

ADD default.conf /etc/nginx/conf.d/

WORKDIR /usr/share/nginx/html

RUN chmod -R a+rx *
