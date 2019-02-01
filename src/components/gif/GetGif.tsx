import React from "react";
import axios from "axios";

const API_KEY = process.env.REACT_APP_GIPHY_KEY;

export type GifData = {
  slug: string;
  images: {
    original: {
      url: string;
    };
  };
};

export type GetGifState = {
  loading: boolean;
  data?: GifData;
  error?: Error;
};

export type GetGifProps = {
  searchTerms: string[];
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
    const { searchTerms, index = 0 } = this.props;
    const query = searchTerms.join("&");
    const url = `/gifs/search`;
    try {
      const { data } = await axios.get(url, {
        params: { api_key: API_KEY, q: query }
      });
      const imageData = data.data[index];
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
