# 7connect Auto Send Sale Script

This guide will walk you through the steps to clone a repository, install dependencies, and run the application.

## Prerequisites

- **Node.js** (version 14 or later recommended)
- **Git**


# Steps

**1. Run Git Bash**

   Open any folder, right-click, select **Open Git Bash Here** and type the following command on the terminal.

Create a directory
   
```cmd
mkdir application
```

  Go to application directory

```cmd
cd application
```

**2. Clone the project and install dependencies**

   To clone the project, and install dependencies, type the following commands

```bash
git clone https://github.com/encinares16/auto-sendsale-ecpay.git
```

```cmd
cd log-file-extractor
```

Installing dependencies

```cmd
npm install
```

**3. Edit .env file (7connect credential)**
```bash
Open VS Code and edit the environment variable.
PROD_SEVEN_CONNECT_USERNAME=auto_send_sale
PROD_SEVEN_CONNECT_PASS=YOURPASSWORDHERE
```

**3. Add 7connect references in the text file. References.txt**
```bash
Open VS Code and edit the environment variable.
PROD_SEVEN_CONNECT_USERNAME=auto_send_sale
PROD_SEVEN_CONNECT_PASS=YOURPASSWORDHERE
```

