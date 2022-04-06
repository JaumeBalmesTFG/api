FROM node:17.5.0

# Create app directoy
RUN mkdir -p /opt/api/
WORKDIR /opt/api/

# Copy and install
COPY package.json/ /opt/api/
COPY package-lock.json/ /opt/api/
RUN npm install --quiet

# Copy the rest of file
COPY ./ /opt/api/

# Open aplication ports
EXPOSE 8080

# Run aplication
CMD ["npm", "run", "prod"]
