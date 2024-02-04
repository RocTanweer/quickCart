## Prerequisites

Please make sure the following technologies are available on your machine

- **MySQL** Either [Download MySQL](https://dev.mysql.com/downloads/installer/) directly or follow [this instruction](https://www.youtube.com/watch?v=k5tICunelSU&ab_channel=AmitThinks)
- **NodeJS** [Download nodejs](https://nodejs.org/en) from here. Make sure to choose _recommended for most user_ option.
- **Git** [Install git](https://git-scm.com/downloads) directly or follow [this instruction](https://www.youtube.com/watch?v=Wqgw-v9OVGI&ab_channel=WebStylePress)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)

## Installation

1. Clone the repository:

```bash
    git clone https://github.com/RocTanweer/quickCart.git
```

2. Navigate to the server directory:

```bash
    cd quickCart/server
```

3. Install dependencies:

```bash
    npm install
```

4. Configure the project:

- **Environment Variables setup:** create a .env file following .env.example file and putting your own credentials
- **Database Initialization:** Run the provided sql script to setup database

```bash
     mysql -u your_db_user  -p < ./config/schema.sql
```

5. Start the application:

```bash
    npm run dev
```

## Usage

When the server is running, you may use an API client like Thunder Client, which is a vs code extension by following [this tutorial](https://www.youtube.com/watch?v=43jRFjpWldk&ab_channel=HiteshChoudhary) or similar ones.

You may see all the available API end points in the **routes** directory. Try hitting them with your API client and see how it works 😉

## Contributing

1. Fork the repository.
2. Follow the above installation process
3. Create a new branch for your feature or bug fix: `git checkout -b feature-name`.
4. Commit your changes: `git commit -m 'Add some feature'`.
5. Push to the branch: `git push origin feature-name`.
6. Create a pull request.
