# Dependencies
+ `react-hook-form` for form register
+ `prisma` for ORM that connect with the database
+ `next-auth` for OAuth
+ `next-superjson-plugin` for sendding the property from server components to client components
+ `data-fns`
+ `next-cloudinary`, which is a image and media middleware powered by cloudinay that is a Saas platform you can store your media file and use their widget
+ `@headlessui/react` is a UI components, which contain many type of component, e.g. Dialog, Tabs...
+ `react-select`, which is a UI select component
+ `react-spinners`, which is a UI loading spinner component
+ `pusher`, `pusher-js`
+ `loadash`
+ `zustand`


# Step
1. Create the Login UI interface
2. Database configuration
   1. Using Prisma to define the attribute of the database
   2. Create the databse on Mongodb, and configure on file. Make sure enter correct URL/**database name** 
   3. Use `npx prisma db push` to push configuration of scheme.prisma to database
   4. Create prisma client at `@/libs/prismadb.ts`
   5. Create the api route of register
3. Create the config of the Next-auth at `api/auth/[...nextauth]`
   1. import the Providers you need, e.g. Github, Google,or use the credentials(password)
   2. use the `signIn()` from next-auth/react to login and `router.push` function to redirect to the user page
   3. Create the `middleware.ts` page at **same direcdtory of the `/app` directory** to apply the middleware  
4. Create User page UI interface
   1. Create the Hooks `useConversation` to get the pathname, and `useRoutes` to store the routes and its icon and attributes
   2. Create the RWD sidebar list and Avatar
   3. Create the actions `getCurrentUser.ts`, which get the properties of next-auth to get data of database through the prisma
   4. Using the [next-superjson-plugin](https://github.com/blitz-js/next-superjson-plugin) to send the attributes from server components to client components
5. Create Conversation list
   1. `getConversation` to get conversations list through prisma
   2. `ConversationList` UI, and `useConversation` to get the chatroom ID, which check if the room is open
   3. `ConversationBox` UI showing the latest imformation of conversation. Using a lot of **useMemo** to store
6. Create chat room
   1. `header`, `body`, and `form`. Especially the form that can upload image and text
   2. Using `next-cloudinary` to connect the cloudinay to upload image, and create `/api/message` to upload text and url of image
   3. create `/api/conversation/[conversationId]/seen` that to update the state when other was read the message
7. Create the Drawer, Setting, GroupChat
   1. Using the `@headlessui` to create `ProfileDrawer` page, which provide many UI component and can easily style the transition
   2. Using the `@headlessui` to create a universal component `Modal`, which can popup a window that show you information
   3. Create the Setting Modal
   4. Create the Create GroupChat Modal by using the `react-select`
   5. And create the loading page by using the `react-spinners`, which provide the component of loading spinner
 


# Note
1. Tailwind, `focus-visible:` is a psuedo-class that can disable focus outline. But when you use the `Tab` to focus the element, it can show the outline
2. Tailwind, `inset`, which is **top/bottom/left/right** syntactic sugar. [Tailwind-inset](https://tailwindcss.com/docs/top-right-bottom-left)
3. Tailwind, `ring`, show the ring appearance, which is different from the border.
4. Tailwind, `sr-only`, which can hide element visually without hiding it from screen-readers