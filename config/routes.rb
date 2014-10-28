Rails.application.routes.draw do
  root 'comments#index'
  namespace 'api' do
    namespace 'v1' do
      resources :comments, only: [:index, :show, :create, :update, :destroy]
    end
  end
end
