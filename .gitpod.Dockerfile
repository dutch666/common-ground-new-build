FROM gitpod/workspace-full:latest

# Install Go (if not already present in the Gitpod image) or upgrade it if necessary
RUN sudo apt-get update && sudo apt-get install -y golang-go

# Set GOPATH if not already set
ENV GOPATH=/workspace/go

# Add GOPATH/bin to PATH
ENV PATH=$GOPATH/bin:$PATH
