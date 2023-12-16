# CodeSandbox supports debian & ubuntu based images
FROM ubuntu


# Example; install htop by default
RUN apt update -y && apt install -y htop git
RUN apt-get -y install dh-autoreconf libcurl4-gnutls-dev libexpat1-dev \
    gettext libz-dev libssl-dev install-info make gcc
RUN curl -L https://foundry.paradigm.xyz | bash
RUN /root/.foundry/bin/foundryup
RUN wget https://mirrors.edge.kernel.org/pub/software/scm/git/git-2.43.0.tar.gz
RUN tar xzvf git-2.43.0.tar.gz
RUN cd git-2.43.0 && make
# The project will be mounted in /workspace by default

# Every new shell will open inside the built container

# On top of this build, we install `zsh`, `git` and `docker` as additional
# Docker layers.
