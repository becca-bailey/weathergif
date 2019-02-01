import React from "react";
import axios from "axios";

const API_KEY = process.env.REACT_APP_DARK_SKY_KEY;

export type Forecast = {
  summary: string;
  temperature: number;
  precipType?: string;
  precipProbability?: string;
};

export type GetForecastState = {
  loading: boolean;
  data?: Forecast;
  error?: Error;
};

export type GetForecastProps = {
  latitude: number;
  longitude: number;
  children(props: GetForecastState): React.ReactNode;
};

class GetForecast extends React.Component<GetForecastProps, GetForecastState> {
  state = {
    loading: true,
    data: undefined,
    error: undefined
  };

  async componentDidMount() {
    const { latitude, longitude } = this.props;
    const url = `/forecast/${API_KEY}/${latitude},${longitude}`;
    try {
      const { data } = await axios.get(url);
      return this.setState({
        data: data.currently,
        loading: false
      });
    } catch (error) {
      return this.setState({
        error,
        loading: false
      });
    }
  }

  render() {
    const { children } = this.props;
    return <React.Fragment>{children(this.state)}</React.Fragment>;
  }
}

export default GetForecast;
