class CommentsController < ApplicationController
  before_action :set_comment, only: [:edit, :update, :destroy]

  def index
    @comments = Comment.all
  end

  def edit
  end

  def create
    @comment = Comment.create(comment_params)
  end

  def update
    @comment.update(comment_params)
  end

  def destroy
    @comment.destroy
  end

private

  def set_comment
    @comment = Comment.find(params[:id])
  end

  def comment_params
    params.require(:comment).permit(:body)
  end
end
