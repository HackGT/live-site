FROM node:10-alpine

# Bundle Source
RUN mkdir -p /usr/src/virtual-checkin
WORKDIR /usr/src/virtual-checkin/participant_server
COPY . /usr/src/virtual-checkin/participant_server
RUN npm install --unsafe-perm

# Set Timezone to EST
RUN apk add tzdata
ENV TZ="/usr/share/zoneinfo/America/New_York"

FROM node:10-alpine
COPY --from=0 /usr/src/virtual-checkin/participant_server/ /usr/src/virtual-checkin/participant_server/
WORKDIR /usr/src/virtual-checkin
EXPOSE 3000
CMD ["node", "participant_server/build/app.js"]