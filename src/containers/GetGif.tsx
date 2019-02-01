import React from "react";
import axios from "axios";

const API_KEY = process.env.REACT_APP_GIPHY_KEY;

type GetGifState = {
  loading: boolean;
  data?: any;
  error?: Error;
};

type GetGifProps = {
  searchTerms: string[];
  children(props: GetGifState): React.ReactNode;
};

class GetGif extends React.Component<GetGifProps, GetGifState> {
  state = {
    loading: true,
    data: undefined,
    error: undefined
  };

  async componentDidMount() {
    const { searchTerms } = this.props;
    const url = `/gifs/search`;
    try {
      const { data } = await axios.get(url, {
        params: { api_key: API_KEY, q: searchTerms }
      });
      return this.setState({
        data: data.data[0],
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
