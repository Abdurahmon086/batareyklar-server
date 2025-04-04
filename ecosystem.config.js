module.exports = {
  apps: [
    {
      name: "admin-batareykalar",
      script: "npm",
      args: "run start",
      env: {
        NODE_ENV: "production",
        PORT: 3303, // Shu portda ishlaydi
      },
    },
  ],
};
