import random
import time
import requests

# specify url, you want to send to
LOG_ENDPOINT = "http://localhost:9000/log"

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

# Creating a list of log levels and log-services
log_services = ["auth-service", "user-service", "payment-service", "inventory-service"]
log_levels = ['INFO', 'ERROR', 'WARNING', 'CRITICAL']       # if use logging, then logging.INFO

# Creating a function that specifies the log syntax and returns log when this fxn is called
def generate_logs():
    log = {
        "timestamp": time.strftime('%Y-%m-%d %H:%M:%S'),
        "service": random.choice(log_services),
        "level": random.choice(log_levels),
        'message': random.choice(log_messages)
    }
    return log

        
if __name__ == "__main__":
    while True:
        log = generate_logs()   # store in logs
        try:
            response = requests.post(LOG_ENDPOINT, json=log)    # send log as json and to endpoint
            print(f"[Sent] {log}: Status: {response.status_code}")
        except:
            print(f"[Error] Failed to send log: {log}")
        
        # Sleep for 1 to 3 seconds
        time.sleep(random.uniform(1, 3))    
    