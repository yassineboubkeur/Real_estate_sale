
FROM node:22.3.0


WORKDIR /frontend  


COPY package*.json ./ 


RUN npm install


COPY . ./  


CMD ["npm", "run", "dev"]
