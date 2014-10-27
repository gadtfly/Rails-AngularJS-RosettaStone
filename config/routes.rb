Rails.application.routes.draw do
  root 'comments#index'
  resources :comments, except: [:show, :new]
end
