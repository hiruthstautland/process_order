import React from "react";
import ErrorCard from "./ErrorCard";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: ""
    };
  }

  static getDerivedStateFromError(error) {
    console.log("getDerivedStateFromError:", error);
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error, errorInfo) {
    console.log("error", error, "ErrorInfo:", errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorCard error={this.state.error} />;
    }
    if (!this.props.children) {
      console.log("Nothing to render?");
    }
    return this.props.children;
  }
}
