/* eslint react/static-property-placement: 0 */
import { Component } from 'react';
import cssCommon from '@/styles/common.css';
import { IErrorBoundaryState, IErrorBoundaryProps } from './interfaces';
import Error from '../Error';

export default class ErrorBoundary extends Component<IErrorBoundaryProps, IErrorBoundaryState> {
  static defaultProps = {
    errorText: 'Похоже, что-то пошло не так',
  };

  constructor(props:IErrorBoundaryProps) {
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
    const { errorText } = this.props;

    if (hasError) {
      return (
        <div className={cssCommon.centerContent}>
          <Error description={errorText} />
        </div>
      );
    }

    const { children } = this.props;

    return children;
  }
}
