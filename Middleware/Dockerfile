# Use the official .NET SDK image for building the application
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the Middleware project file
COPY ../Middleware/Middleware.csproj ./

# Copy the Library project file
COPY ../Library/Library.csproj ../Library/

# Restore dependencies
RUN dotnet restore

# Copy the rest of the Middleware and Library code
COPY . ./
COPY ../Library ../Library

# Build the application
RUN dotnet publish Middleware -c Release -o /out

# Use the official .NET runtime image for running the application
FROM mcr.microsoft.com/dotnet/aspnet:7.0

# Set the working directory inside the container
WORKDIR /app

# Copy the built application from the build stage
COPY --from=build /out .

# Expose the port the application runs on
EXPOSE 80
EXPOSE 443

# Start the application
ENTRYPOINT ["dotnet", "Middleware.dll"]