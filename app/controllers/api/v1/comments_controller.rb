class Api::V1::CommentsController < ActionController::Base
  before_action :set_comment, only: [:show, :update, :destroy]

  def index
    render json: Comment.all
  end

  def show
    render json: @comment
  end

  def create
    render json: Comment.create(comment_params)
  end

  def update
    @comment.update(comment_params)
    render json: @comment
  end

  def destroy
    render json: @comment.destroy
  end

private

  def set_comment
    @comment = Comment.find(params[:id])
  end

  def comment_params
    params.require(:comment).permit(:body)
  end
end
