import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import LineChart from "../components/Chart";
import DropDown from "../components/DropDown";
import { getMonth } from "../utils/GetMonth";

const Main = () => {
  const [currency, setCurrency] = useState("USD");
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const options = [
    { label: "United States Dollar", value: "USD" },
    { label: "British Pound Sterling", value: "GBP" },
    { label: "Euro", value: "EUR" },
  ];

  const handleChange = (e) => {
    setCurrency(e.target.value);
  };

  useEffect(() => {
    setLoading(true);
    const today = new Date(new Date() - 60);
    const month = today.getMonth();
    today.setMonth(month - 2);
    const end = new Date().toLocaleDateString("en-ca");
    const start = today.toLocaleDateString("en-ca");
    fetch(
      `https://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}&start=${start}&end=${end}`
    )
      .then((res) => res.json())
      .then((response) => {
        const respData = response.bpi;
        const data = [];
        const labels = [];
        for (let key in respData) {
          data.push(respData[key]);
          labels.push(getMonth(key.split("-")[1]));
        }
        setData(data);
        setLabels(labels);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [currency]);

  return (
    <Grid container justify="center">
      <Card style={{ width: "100%", margin: 16, padding: 16 }}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <CardContent>
              <DropDown
                onChange={handleChange}
                options={options}
                value={currency}
                label="1 Bitcoin equals"
              />
              <Typography variant="h4">
                {`${data[data.length - 1]} ${
                  options.find((item) => item.value === currency).label
                }`}
              </Typography>
            </CardContent>
          </Grid>
          <Grid item xs={12} md={6}>
            {data.length !== 0 && (
              <CardContent>
                {isLoading ? (
                  "Loading..."
                ) : (
                  <LineChart data={data} labels={labels} />
                )}
              </CardContent>
            )}
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default Main;
