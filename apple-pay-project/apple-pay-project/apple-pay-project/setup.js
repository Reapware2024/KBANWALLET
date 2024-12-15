const { exec } = require('child_process');

// Install RPM package
exec('sudo rpm -i mypackage.rpm', (error, stdout, stderr) => {
    if (error) {
        console.error(`Error installing RPM: ${error.message}`);
        return;
    }
    console.log(`RPM Install Output: ${stdout}`);

    // Install Node.js dependencies
    exec('npm install', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error installing npm packages: ${error.message}`);
            return;
        }
        console.log(`npm Install Output: ${stdout}`);

        // Start the application
        exec('npm start', (error, stdout, stderr) => {
            if (error) {
                console.error(`Error starting application: ${error.message}`);
                return;
            }
            console.log(`App Start Output: ${stdout}`);
        });
    });
});
