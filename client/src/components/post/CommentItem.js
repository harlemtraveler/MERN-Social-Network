import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteComment } from '../../actions/postActions';

class CommentItem extends Component {
  onDeleteClick(postId, commentId) {
    this.props.deleteComment(postId, commentId);
  }

  render() {
    const { comment, postId, auth } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img className="rounded-circle d-none d-md-block" src={ comment.user } alt="" />
            </a>
            <br />
            <p className="text-center">{ comment.name }</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{ comment.text }</p>
            {/* TODO: Logic to display Delete button for individual comments. */}
            {/* Needs ability to only display Delete button for comment owners. Still in development. */}

            {/* {comment.user === auth.user.id ? (<button onClick={this.onDeleteClick.bind(this, postId, comment._id)} type="button" className="btn btn-danger mr-1"><i className="fas fa-times" /></button>) : null} */}
          </div>
        </div>
      </div>
    );
  }
}
// <i className="fas fa-times" />
CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);