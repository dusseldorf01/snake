import { Component } from 'react';
import cssCommon from '@/styles/common.css';
import { IErrorBoundaryState } from './interfaces';
import Error from '../Error';

export default class ErrorBoundary extends Component<{}, IErrorBoundaryState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  render() {
    const { hasError } = this.state;

    if (hasError) {
      return (
        <div className={cssCommon.centerContent}>
          <Error description="Похоже, что-то пошло не так" />
        </div>
      );
    }

    const { children } = this.props;

    return children;
  }
}
