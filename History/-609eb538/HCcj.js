module.exports = {
    client: {
      service: "My Graph 2", // the name of your graph in Studio
      url: "http://localhost:2016/graphql",
      includes: ["./src/**/*.ts"],
      excludes: ["**/__tests__/**"]
    },
  };

