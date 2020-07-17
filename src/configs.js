import axios from "axios";

class Configs {
  _configs = {
    cashIn: {},
    cashOut: {
      natural: {},
      juridical: {},
    },
  };

  async LoadConfigs() {
    try {
      await axios
        .get("http://private-38e18c-uzduotis.apiary-mock.com/config/cash-in")
        .then((res) => (this._configs.cashIn = res.data));
      await axios
        .get(
          "http://private-38e18c-uzduotis.apiary-mock.com/config/cash-out/natural"
        )
        .then((res) => (this._configs.cashOut.natural = res.data));
      await axios
        .get(
          "http://private-38e18c-uzduotis.apiary-mock.com/config/cash-out/juridical"
        )
        .then((res) => (this._configs.cashOut.juridical = res.data));
    } catch (err) {
      console.error(err);
      process.exit(1);
    } finally {
      return this._configs;
    }
  }

  GetConfigs() {
    return this._configs;
  }
}

export default new Configs();
