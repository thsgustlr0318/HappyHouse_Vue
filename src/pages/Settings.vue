<template>
  <div class="row">
    <div class="col-xl-8 col-lg-7 col-md-6">
      <edit-profile-form> </edit-profile-form>
    </div>
    <div class="col-xl-4 col-lg-5 col-md-6">
      <my-question> </my-question>
      <my-location> </my-location>
    </div>
  </div>
</template>
<script>
import EditProfileForm from "./UserProfile/EditProfileForm.vue";
import UserCard from "./UserProfile/UserCard.vue";
import MyLocation from "@/pages/UserProfile/MyLocation.vue";
import MyQuestion from "@/pages/UserProfile/MyQuestion.vue";
export default {
  components: {
    EditProfileForm,
    UserCard,
    MyLocation,
    MyQuestion
  }
};
</script>
<style></style>
