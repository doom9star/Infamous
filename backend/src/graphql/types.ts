import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
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



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AuthLoginArgs: AuthLoginArgs;
  AuthRegisterArgs: AuthRegisterArgs;
  AuthResponse: ResolverTypeWrapper<AuthResponse>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CreateStoryResponse: ResolverTypeWrapper<CreateStoryResponse>;
  GeneralResponse: ResolverTypeWrapper<GeneralResponse>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Image: ResolverTypeWrapper<Image>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Response: ResolversTypes['AuthResponse'] | ResolversTypes['CreateStoryResponse'] | ResolversTypes['GeneralResponse'] | ResolversTypes['SearchStoriesResponse'] | ResolversTypes['StoriesResponse'] | ResolversTypes['StoryResponse'] | ResolversTypes['UserResponse'];
  SearchStoriesResponse: ResolverTypeWrapper<SearchStoriesResponse>;
  StoriesResponse: ResolverTypeWrapper<StoriesResponse>;
  Story: ResolverTypeWrapper<Story>;
  StoryResponse: ResolverTypeWrapper<StoryResponse>;
  StoryType: StoryType;
  String: ResolverTypeWrapper<Scalars['String']>;
  UpdateImageState: UpdateImageState;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
  User: ResolverTypeWrapper<User>;
  UserResponse: ResolverTypeWrapper<UserResponse>;
  createStoryArgs: CreateStoryArgs;
  updateStoryArgs: UpdateStoryArgs;
  updateUserArgs: UpdateUserArgs;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuthLoginArgs: AuthLoginArgs;
  AuthRegisterArgs: AuthRegisterArgs;
  AuthResponse: AuthResponse;
  Boolean: Scalars['Boolean'];
  CreateStoryResponse: CreateStoryResponse;
  GeneralResponse: GeneralResponse;
  ID: Scalars['ID'];
  Image: Image;
  Int: Scalars['Int'];
  Mutation: {};
  Query: {};
  Response: ResolversParentTypes['AuthResponse'] | ResolversParentTypes['CreateStoryResponse'] | ResolversParentTypes['GeneralResponse'] | ResolversParentTypes['SearchStoriesResponse'] | ResolversParentTypes['StoriesResponse'] | ResolversParentTypes['StoryResponse'] | ResolversParentTypes['UserResponse'];
  SearchStoriesResponse: SearchStoriesResponse;
  StoriesResponse: StoriesResponse;
  Story: Story;
  StoryResponse: StoryResponse;
  String: Scalars['String'];
  Upload: Scalars['Upload'];
  User: User;
  UserResponse: UserResponse;
  createStoryArgs: CreateStoryArgs;
  updateStoryArgs: UpdateStoryArgs;
  updateUserArgs: UpdateUserArgs;
};

export type AuthResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthResponse'] = ResolversParentTypes['AuthResponse']> = {
  status?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateStoryResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateStoryResponse'] = ResolversParentTypes['CreateStoryResponse']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GeneralResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['GeneralResponse'] = ResolversParentTypes['GeneralResponse']> = {
  status?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ImageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Image'] = ResolversParentTypes['Image']> = {
  filename?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createStory?: Resolver<ResolversTypes['CreateStoryResponse'], ParentType, ContextType, RequireFields<MutationCreateStoryArgs, 'args'>>;
  deleteStory?: Resolver<ResolversTypes['GeneralResponse'], ParentType, ContextType, RequireFields<MutationDeleteStoryArgs, 'sid'>>;
  deleteUser?: Resolver<ResolversTypes['GeneralResponse'], ParentType, ContextType>;
  login?: Resolver<ResolversTypes['AuthResponse'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'args'>>;
  logout?: Resolver<ResolversTypes['GeneralResponse'], ParentType, ContextType>;
  register?: Resolver<ResolversTypes['AuthResponse'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'args'>>;
  updateStory?: Resolver<ResolversTypes['GeneralResponse'], ParentType, ContextType, RequireFields<MutationUpdateStoryArgs, 'args'>>;
  updateUser?: Resolver<ResolversTypes['GeneralResponse'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'args'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getSearchStories?: Resolver<ResolversTypes['SearchStoriesResponse'], ParentType, ContextType, RequireFields<QueryGetSearchStoriesArgs, 'query'>>;
  getStories?: Resolver<ResolversTypes['StoriesResponse'], ParentType, ContextType, RequireFields<QueryGetStoriesArgs, 'type'>>;
  getStory?: Resolver<ResolversTypes['StoryResponse'], ParentType, ContextType, RequireFields<QueryGetStoryArgs, 'sid'>>;
  getUser?: Resolver<ResolversTypes['UserResponse'], ParentType, ContextType>;
};

export type ResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['Response'] = ResolversParentTypes['Response']> = {
  __resolveType: TypeResolveFn<'AuthResponse' | 'CreateStoryResponse' | 'GeneralResponse' | 'SearchStoriesResponse' | 'StoriesResponse' | 'StoryResponse' | 'UserResponse', ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
};

export type SearchStoriesResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['SearchStoriesResponse'] = ResolversParentTypes['SearchStoriesResponse']> = {
  status?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  stories?: Resolver<Array<ResolversTypes['Story']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StoriesResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['StoriesResponse'] = ResolversParentTypes['StoriesResponse']> = {
  public?: Resolver<Maybe<Array<ResolversTypes['Story']>>, ParentType, ContextType>;
  published?: Resolver<Maybe<Array<ResolversTypes['Story']>>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  unpublished?: Resolver<Maybe<Array<ResolversTypes['Story']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Story'] = ResolversParentTypes['Story']> = {
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  genre?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  pages?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  published?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  thumbnail?: Resolver<Maybe<ResolversTypes['Image']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StoryResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['StoryResponse'] = ResolversParentTypes['StoryResponse']> = {
  status?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  story?: Resolver<Maybe<ResolversTypes['Story']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  anonymous?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  avatar?: Resolver<Maybe<ResolversTypes['Image']>, ParentType, ContextType>;
  banner?: Resolver<Maybe<ResolversTypes['Image']>, ParentType, ContextType>;
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  stories?: Resolver<Maybe<Array<ResolversTypes['Story']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserResponse'] = ResolversParentTypes['UserResponse']> = {
  status?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AuthResponse?: AuthResponseResolvers<ContextType>;
  CreateStoryResponse?: CreateStoryResponseResolvers<ContextType>;
  GeneralResponse?: GeneralResponseResolvers<ContextType>;
  Image?: ImageResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Response?: ResponseResolvers<ContextType>;
  SearchStoriesResponse?: SearchStoriesResponseResolvers<ContextType>;
  StoriesResponse?: StoriesResponseResolvers<ContextType>;
  Story?: StoryResolvers<ContextType>;
  StoryResponse?: StoryResponseResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  UserResponse?: UserResponseResolvers<ContextType>;
};

