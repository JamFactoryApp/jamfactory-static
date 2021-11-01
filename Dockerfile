FROM node:14
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
CMD ["npm", "run", "start", "--", "--host", "0.0.0.0"]