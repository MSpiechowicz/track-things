export const load = async ({ parent }) => {
  console.log('parent', await parent());
  const { userProfile } = await parent();
  console.log('userProfile', userProfile);

  return {
    userProfile,
  };
};
