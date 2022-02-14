FROM node:17.5.0

# Create app directoy
RUN mkdir -p /opt/app
WORKDIR /opt/app

# Copy and install
COPY package*.json .
RUN npm install --quiet

# Copy the rest of file
COPY . .

# Link volumenes
ADD . .

# Open aplication ports
EXPOSE 8080

# Run aplication
CMD ["npm", "start"]

