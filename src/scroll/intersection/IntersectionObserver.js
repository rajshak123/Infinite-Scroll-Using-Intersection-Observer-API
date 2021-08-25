/* eslint-disable prettier/prettier */
/* eslint-disable react/no-find-dom-node */
import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { createObserver, observeElement, unobserveElement } from './observer';
import {
  shallowCompare,
  isChildrenWithRef,
  hasOwnProperty,
  toString,
} from './utils';
const observerOptions = ['root', 'rootMargin', 'threshold'];
const observableProps = ['root', 'rootMargin', 'threshold', 'disabled'];
export const getOptions = props =>
  observerOptions.reduce((options, key) => {
    const isRootString =
      key === 'root' && toString.call(props.root) === '[object String]';
    return Object.assign(options, {
      [key]: isRootString ? document.querySelector(props[key]) : props[key],
    });
  }, {});
export default class ReactIntersectionObserver extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = event => {
      this.props.onChange(event, this.externalUnobserve);
    };
    this.handleNode = target => {
      const { children } = this.props;
      /**
       * Forward hijacked ref to user.
       */
      if (isChildrenWithRef(children)) {
        const childenRef = children.ref;
        if (typeof childenRef === 'function') {
          childenRef(target);
        } else if (childenRef && hasOwnProperty.call(childenRef, 'current')) {
          /*
           * The children ref.current is read-only, we aren't allowed to do this, so
           * in future release it has to go away, and the ref shall be
           * forwarded and assigned to a DOM node by the user.
           */
          childenRef.current = target;
        }
      }
      this.targetNode = undefined;
      if (target) {
        const targetNode = findDOMNode(target);
        if (targetNode && targetNode.nodeType === 1) {
          this.targetNode = targetNode;
        }
      }
    };
    this.observe = () => {
      if (this.props.children == null || this.props.disabled) {
        return false;
      }
      if (!this.targetNode) {
        throw new Error(
          "ReactIntersectionObserver: Can't find DOM node in the provided children. Make sure to render at least one DOM node in the tree.",
        );
      }
      this.observer = createObserver(getOptions(this.props));
      this.target = this.targetNode;
      observeElement(this);
      return true;
    };
    this.unobserve = target => {
      unobserveElement(this, target);
    };
    this.externalUnobserve = () => {
      if (this.targetNode) {
        this.unobserve(this.targetNode);
      }
    };
  }

  getSnapshotBeforeUpdate(prevProps) {
    this.prevTargetNode = this.targetNode;
    const relatedPropsChanged = observableProps.some(prop =>
      shallowCompare(this.props[prop], prevProps[prop]),
    );
    if (relatedPropsChanged) {
      if (this.prevTargetNode) {
        if (!prevProps.disabled) {
          this.unobserve(this.prevTargetNode);
        }
      }
    }
    return relatedPropsChanged;
  }

  componentDidUpdate(_, __, relatedPropsChanged) {
    let targetNodeChanged = false;
    // check if we didn't unobserve previously due to a prop change
    if (!relatedPropsChanged) {
      targetNodeChanged = this.prevTargetNode !== this.targetNode;
      // check we have a previous node we want to unobserve
      if (targetNodeChanged && this.prevTargetNode != null) {
        this.unobserve(this.prevTargetNode);
      }
    }
    if (relatedPropsChanged || targetNodeChanged) {
      this.observe();
    }
  }

  componentDidMount() {
    this.observe();
  }

  componentWillUnmount() {
    if (this.targetNode) {
      this.unobserve(this.targetNode);
    }
  }

  render() {
    const { children } = this.props;
    return children != null
      ? React.cloneElement(React.Children.only(children), {
        ref: this.handleNode,
      })
      : null;
  }
}
ReactIntersectionObserver.displayName = 'IntersectionObserver';
ReactIntersectionObserver.propTypes = {
  onChange: PropTypes.func.isRequired,
  children: PropTypes.any,
  disabled: PropTypes.any,
};
