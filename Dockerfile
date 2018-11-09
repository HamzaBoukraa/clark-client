# Create image based on the official Node 6 image from dockerhub
FROM node:8 as builder

# Create a directory where our app will be placed
RUN mkdir -p /opt/src/app

# Expose the port the app runs in and the webpack server port
EXPOSE 4200 49153

# install dependencies in a different location for easier app bind mounting for local development
WORKDIR /opt
COPY package.json package-lock.json*  cypress.json ./
RUN npm install && npm cache clean --force
ENV PATH /opt/node_modules/.bin:$PATH

# Copy source to the app's directory
WORKDIR /opt/src/app
COPY . /opt/src/app

# Serve the app
CMD ["npm", "start"]

FROM cypress/browsers:chrome67 as tester

WORKDIR /opt/src/app
COPY --from=builder /opt/src/app .

RUN npm install && npm cache clean --force
ENV PATH /opt/node_modules/.bin:$PATH

RUN npm install -g cypress

RUN ls

RUN npm start 

RUN npm run e2e



