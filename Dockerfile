FROM node:12-alpine

RUN mkdir -p /usr/src/virtual-checkin
WORKDIR /usr/src/virtual-checkin
COPY . /usr/src/virtual-checkin
RUN npm install --unsafe-perm

# Set Timezone to EST
ENV TZ="America/New_York"

EXPOSE 3000
CMD ["npm", "run", "start"]