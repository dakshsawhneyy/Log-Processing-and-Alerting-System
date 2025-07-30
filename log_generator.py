import logging
import random
import time

# Configure Logging 
logging.basicConfig(
    level=logging.INFO,  # Min severity of logs, Like INFO, Critical after INFO, all
    format='%(asctime)s [%(level)s%] %(message)s%',  # format to print messages
    handlers=[
        logging.fileHandler("app.log"),      # sends output to this file
        logging.StreamHandler()     # Also prints output to console
    ]
)

# generating a random list of messages
log_messages = [
    "User logged in",
    "User logged out",
    "File uploaded",
    "File download failed",
    "Database connection established",
    "Database query failed",
    "Cache miss for user session",
    "Background job started",
    "Service health check passed",
    "Service restart triggered"
]

# Creating a list of log levels
log_levels = [logging.INFO, logging.ERROR, logging.WARNING]

# Creating a function that runs infinitely and produces logs
def generate_logs():
    while True:
        message = random.choice(log_messages)
        level = random.choice(log_levels)
        logging.log(level, message)
        time.sleep(random.uniform(0.5, 2.0))    # sleep for 0.t to 2 seconds
        
if __name__ == "__main__":
    generate_logs()