export const load = async ({ parent }) => {
  const { userProfile } = await parent();

  return {
    userProfile,
  };
};
