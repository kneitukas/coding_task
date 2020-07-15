import axios from "axios";

  class Configs {
  async LoadConfigs() {
    const configs = {
      cashIn: {},
      cashOut: {
        natural: {},
        juridical: {},
      },
    };

    try {
      await axios
        .get("http://private-38e18c-uzduotis.apiary-mock.com/config/cash-in")
        .then((res) => (configs.cashIn = res.data));
      await axios
        .get(
          "http://private-38e18c-uzduotis.apiary-mock.com/config/cash-out/natural"
        )
        .then((res) => (configs.cashOut.natural = res.data));
      await axios
        .get(
          "http://private-38e18c-uzduotis.apiary-mock.com/config/cash-out/juridical"
        )
        .then((res) => (configs.cashOut.juridical = res.data));
    } catch (err) {
      console.error(err);
      process.exit(1);
    } finally {
      return configs;
    }
  }
}

export let configs = new Configs()
