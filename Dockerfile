# FROM node:14-alpine
FROM node:16.5-alpine

# Install Needed Packages.
USER root
RUN set -xe; \
    apk update && \
    apk add --no-cache g++ && \
    apk add --no-cache make && \
    apk add --no-cache pkgconfig && \
    apk add --no-cache supervisor && \
    apk add --no-cache nano && \
    apk add --no-cache curl && \
    apk add --no-cache unzip && \
    apk add --no-cache autoconf && \
    apk add --no-cache bash

# Creating a new directory for app files and setting path in the container
WORKDIR /var/app

# Copy all files to the container file system
COPY ./ .

#--------------------------------------------------------------------------
# Final Touch
#--------------------------------------------------------------------------

# Clean up
RUN rm -rf /tmp/* /var/tmp/* && \
    rm -rf /var/log/lastlog /var/log/faillog

USER guest

CMD ["npm", "run", "start:dev"]