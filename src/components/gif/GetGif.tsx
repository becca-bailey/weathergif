import React from "react";
import axios from "axios";

const API_KEY = process.env.REACT_APP_GIPHY_KEY;

export type GetGifState = {
  loading: boolean;
  data?: any;
  error?: Error;
};

export type GetGifProps = {
  searchTerms: string[];
  size?: string;
  index?: number;
  children(props: GetGifState): React.ReactNode;
};

class GetGif extends React.Component<GetGifProps, GetGifState> {
  state = {
    loading: true,
    data: undefined,
    error: undefined
  };

  async componentDidMount() {
    const { searchTerms, size = "original", index = 0 } = this.props;
    const url = `/gifs/search`;
    try {
      const { data } = await axios.get(url, {
        params: { api_key: API_KEY, q: searchTerms }
      });
      const imageData = data.data[index].images[size];
      return this.setState({
        data: imageData,
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

export default GetGif;
