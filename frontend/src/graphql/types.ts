export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type AuthLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type AuthRegisterArgs = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type AuthResponse = Response & {
  __typename?: 'AuthResponse';
  status: Scalars['Int'];
  user?: Maybe<User>;
};

export type CreateStoryResponse = Response & {
  __typename?: 'CreateStoryResponse';
  id?: Maybe<Scalars['ID']>;
  status: Scalars['Int'];
};

export type GeneralResponse = Response & {
  __typename?: 'GeneralResponse';
  status: Scalars['Int'];
};

export type Image = {
  __typename?: 'Image';
  filename?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createStory: CreateStoryResponse;
  deleteStory: GeneralResponse;
  deleteUser: GeneralResponse;
  login: AuthResponse;
  logout: GeneralResponse;
  register: AuthResponse;
  updateStory: GeneralResponse;
  updateUser: GeneralResponse;
};


export type MutationCreateStoryArgs = {
  args: CreateStoryArgs;
};


export type MutationDeleteStoryArgs = {
  sid: Scalars['String'];
};


export type MutationLoginArgs = {
  args: AuthLoginArgs;
};


export type MutationRegisterArgs = {
  args: AuthRegisterArgs;
};


export type MutationUpdateStoryArgs = {
  args: UpdateStoryArgs;
};


export type MutationUpdateUserArgs = {
  args: UpdateUserArgs;
};

export type Query = {
  __typename?: 'Query';
  getSearchStories: SearchStoriesResponse;
  getStories: StoriesResponse;
  getStory: StoryResponse;
  getUser: UserResponse;
};


export type QueryGetSearchStoriesArgs = {
  query: Scalars['String'];
};


export type QueryGetStoriesArgs = {
  genre?: Maybe<Scalars['String']>;
  type: StoryType;
  uid?: Maybe<Scalars['String']>;
};


export type QueryGetStoryArgs = {
  sid: Scalars['String'];
};

export type Response = {
  status: Scalars['Int'];
};

export type SearchStoriesResponse = Response & {
  __typename?: 'SearchStoriesResponse';
  status: Scalars['Int'];
  stories: Array<Story>;
};

export type StoriesResponse = Response & {
  __typename?: 'StoriesResponse';
  public?: Maybe<Array<Story>>;
  published?: Maybe<Array<Story>>;
  status: Scalars['Int'];
  unpublished?: Maybe<Array<Story>>;
};

export type Story = {
  __typename?: 'Story';
  description?: Maybe<Scalars['String']>;
  genre?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  pages: Array<Scalars['String']>;
  published: Scalars['Boolean'];
  thumbnail?: Maybe<Image>;
  title: Scalars['String'];
  user?: Maybe<User>;
};

export type StoryResponse = Response & {
  __typename?: 'StoryResponse';
  status: Scalars['Int'];
  story?: Maybe<Story>;
};

export enum StoryType {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export enum UpdateImageState {
  None = 'NONE',
  Remove = 'REMOVE',
  Update = 'UPDATE'
}

export type User = {
  __typename?: 'User';
  anonymous: Scalars['Boolean'];
  avatar?: Maybe<Image>;
  banner?: Maybe<Image>;
  bio?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  stories?: Maybe<Array<Story>>;
};

export type UserResponse = Response & {
  __typename?: 'UserResponse';
  status: Scalars['Int'];
  user?: Maybe<User>;
};

export type CreateStoryArgs = {
  thumbnail?: Maybe<Scalars['Upload']>;
  title: Scalars['String'];
};

export type UpdateStoryArgs = {
  description?: Maybe<Scalars['String']>;
  genre?: Maybe<Scalars['String']>;
  pages: Array<Scalars['String']>;
  published: Scalars['Boolean'];
  sid: Scalars['ID'];
  thumbnail?: Maybe<Scalars['Upload']>;
  thumbnailState: UpdateImageState;
  title: Scalars['String'];
};

export type UpdateUserArgs = {
  anonymous: Scalars['Boolean'];
  avatar?: Maybe<Scalars['Upload']>;
  avatarState: UpdateImageState;
  banner?: Maybe<Scalars['Upload']>;
  bannerState: UpdateImageState;
  bio?: Maybe<Scalars['String']>;
};

export type FImageFragment = { __typename?: 'Image', url?: string | null | undefined, filename?: string | null | undefined };

export type FStoryFragment = { __typename?: 'Story', id: string, title: string, pages: Array<string>, published: boolean, description?: string | null | undefined, genre?: string | null | undefined, thumbnail?: { __typename?: 'Image', url?: string | null | undefined, filename?: string | null | undefined } | null | undefined, user?: { __typename?: 'User', id: string, name: string, bio?: string | null | undefined, anonymous: boolean, avatar?: { __typename?: 'Image', url?: string | null | undefined, filename?: string | null | undefined } | null | undefined, banner?: { __typename?: 'Image', url?: string | null | undefined, filename?: string | null | undefined } | null | undefined } | null | undefined };

export type FUserFragment = { __typename?: 'User', id: string, name: string, bio?: string | null | undefined, anonymous: boolean, avatar?: { __typename?: 'Image', url?: string | null | undefined, filename?: string | null | undefined } | null | undefined, banner?: { __typename?: 'Image', url?: string | null | undefined, filename?: string | null | undefined } | null | undefined };

export type CreateStoryMutationVariables = Exact<{
  title: Scalars['String'];
  thumbnail?: Maybe<Scalars['Upload']>;
}>;


export type CreateStoryMutation = { __typename?: 'Mutation', createStory: { __typename?: 'CreateStoryResponse', status: number, id?: string | null | undefined } };

export type DeleteUserMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: { __typename?: 'GeneralResponse', status: number } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthResponse', status: number, user?: { __typename?: 'User', id: string, name: string, bio?: string | null | undefined, anonymous: boolean, avatar?: { __typename?: 'Image', url?: string | null | undefined, filename?: string | null | undefined } | null | undefined, banner?: { __typename?: 'Image', url?: string | null | undefined, filename?: string | null | undefined } | null | undefined } | null | undefined } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'GeneralResponse', status: number } };

export type RegisterMutationVariables = Exact<{
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'AuthResponse', status: number, user?: { __typename?: 'User', id: string, name: string, bio?: string | null | undefined, anonymous: boolean, avatar?: { __typename?: 'Image', url?: string | null | undefined, filename?: string | null | undefined } | null | undefined, banner?: { __typename?: 'Image', url?: string | null | undefined, filename?: string | null | undefined } | null | undefined } | null | undefined } };

export type UpdateStoryMutationVariables = Exact<{
  sid: Scalars['ID'];
  title: Scalars['String'];
  pages: Array<Scalars['String']> | Scalars['String'];
  thumbnailState: UpdateImageState;
  thumbnail?: Maybe<Scalars['Upload']>;
  published: Scalars['Boolean'];
  description?: Maybe<Scalars['String']>;
  genre?: Maybe<Scalars['String']>;
}>;


export type UpdateStoryMutation = { __typename?: 'Mutation', updateStory: { __typename?: 'GeneralResponse', status: number } };

export type UpdateUserMutationVariables = Exact<{
  bio?: Maybe<Scalars['String']>;
  anonymous: Scalars['Boolean'];
  avatar?: Maybe<Scalars['Upload']>;
  avatarState: UpdateImageState;
  banner?: Maybe<Scalars['Upload']>;
  bannerState: UpdateImageState;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'GeneralResponse', status: number } };

export type GetSearchStoriesQueryVariables = Exact<{
  query: Scalars['String'];
}>;


export type GetSearchStoriesQuery = { __typename?: 'Query', getSearchStories: { __typename?: 'SearchStoriesResponse', status: number, stories: Array<{ __typename?: 'Story', id: string, title: string, pages: Array<string>, published: boolean, description?: string | null | undefined, genre?: string | null | undefined, thumbnail?: { __typename?: 'Image', url?: string | null | undefined, filename?: string | null | undefined } | null | undefined, user?: { __typename?: 'User', id: string, name: string, bio?: string | null | undefined, anonymous: boolean, avatar?: { __typename?: 'Image', url?: string | null | undefined, filename?: string | null | undefined } | null | undefined, banner?: { __typename?: 'Image', url?: string | null | undefined, filename?: string | null | undefined } | null | undefined } | null | undefined }> } };

export type GetStoriesQueryVariables = Exact<{
  type: StoryType;
  genre?: Maybe<Scalars['String']>;
  uid?: Maybe<Scalars['String']>;
}>;


export type GetStoriesQuery = { __typename?: 'Query', getStories: { __typename?: 'StoriesResponse', status: number, public?: Array<{ __typename?: 'Story', id: string, title: string, pages: Array<string>, published: boolean, description?: string | null | undefined, genre?: string | null | undefined, thumbnail?: { __typename?: 'Image', url?: string | null | undefined, filename?: string | null | undefined } | null | undefined, user?: { __typename?: 'User', id: string, name: string, bio?: string | null | undefined, anonymous: boolean, avatar?: { __typename?: 'Image', url?: string | null | undefined, filename?: string | null | undefined } | null | undefined, banner?: { __typename?: 'Image', url?: string | null | undefined, filename?: string | null | undefined } | null | undefined } | null | undefined }> | null | undefined, published?: Array<{ __typename?: 'Story', id: string, title: string, pages: Array<string>, published: boolean, description?: string | null | undefined, genre?: string | null | undefined, thumbnail?: { __typename?: 'Image', url?: string | null | undefined, filename?: string | null | undefined } | null | undefined, user?: { __typename?: 'User', id: string, name: string, bio?: string | null | undefined, anonymous: boolean, avatar?: { __typename?: 'Image', url?: string | null | undefined, filename?: string | null | undefined } | null | undefined, banner?: { __typename?: 'Image', url?: string | null | undefined, filename?: string | null | undefined } | null | undefined } | null | undefined }> | null | undefined, unpublished?: Array<{ __typename?: 'Story', id: string, title: string, pages: Array<string>, published: boolean, description?: string | null | undefined, genre?: string | null | undefined, thumbnail?: { __typename?: 'Image', url?: string | null | undefined, filename?: string | null | undefined } | null | undefined, user?: { __typename?: 'User', id: string, name: string, bio?: string | null | undefined, anonymous: boolean, avatar?: { __typename?: 'Image', url?: string | null | undefined, filename?: string | null | undefined } | null | undefined, banner?: { __typename?: 'Image', url?: string | null | undefined, filename?: string | null | undefined } | null | undefined } | null | undefined }> | null | undefined } };

export type GetStoryQueryVariables = Exact<{
  sid: Scalars['String'];
}>;


export type GetStoryQuery = { __typename?: 'Query', getStory: { __typename?: 'StoryResponse', status: number, story?: { __typename?: 'Story', id: string, title: string, pages: Array<string>, published: boolean, description?: string | null | undefined, genre?: string | null | undefined, thumbnail?: { __typename?: 'Image', url?: string | null | undefined, filename?: string | null | undefined } | null | undefined, user?: { __typename?: 'User', id: string, name: string, bio?: string | null | undefined, anonymous: boolean, avatar?: { __typename?: 'Image', url?: string | null | undefined, filename?: string | null | undefined } | null | undefined, banner?: { __typename?: 'Image', url?: string | null | undefined, filename?: string | null | undefined } | null | undefined } | null | undefined } | null | undefined } };

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'Query', getUser: { __typename?: 'UserResponse', status: number, user?: { __typename?: 'User', id: string, name: string, bio?: string | null | undefined, anonymous: boolean, avatar?: { __typename?: 'Image', url?: string | null | undefined, filename?: string | null | undefined } | null | undefined, banner?: { __typename?: 'Image', url?: string | null | undefined, filename?: string | null | undefined } | null | undefined } | null | undefined } };
