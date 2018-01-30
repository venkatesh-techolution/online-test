<template>
    <div class="form-group" >
       <label for="fname">{{ name ? 'Hello, ' + updateString(name) : 'Your Name'}}</label>
       <input v-model.lazy.trim="name"
            @input="$v.name.$touch"
            :class="{error: $v.name.$error, valid: $v.name.$dirty && !$v.name.$invalid}"
            type="text" id="fname" name="firstname" placeholder="Your name..">
       <label for="lname">{{ place ? 'You are from '+ updateString(place) : 'Where are you from ?'}}</label>
       <input v-model.lazy.trim="place"
            @input="$v.place.$touch"
            :class="{error: $v.place.$error, valid: $v.place.$dirty && !$v.place.$invalid}"
            type="text" id="place" name="place" placeholder="Place">
       <label for="lname">Contact Person {{ contactPerson ? 'is '+ updateString(contactPerson) : '?'}}</label>
       <!-- <input v-model="contactPerson"
            @input="$v.contactPerson.$touch"
            :class="{error: $v.contactPerson.$error, valid: $v.contactPerson.$dirty && !$v.contactPerson.$invalid}"
            type="text" id="contactPerson" name="contactPerson" placeholder="Conact Person"> -->
        <!-- <select v-model="contactPerson" :class="{error: $v.contactPerson.$error, valid: $v.contactPerson.$dirty && !$v.contactPerson.$invalid}">
          <option disabled value="">Please Select Your Contact Person</option>
          <option v-for="(person,i ) in contactPersonList" :key="i">
            {{person.name}}
          </option>
        </select> -->

        <v-select @input="updateContactPerson" label="name" :options="contactPersonList" required></v-select>
       
       <input type="submit" value="Proceed" @click="save" 
           :style="{'background-color': $v.$invalid ? 'red' : 'green'}"
           :class="{'disabled': $v.$invalid}"
           :disabled="$v.$invalid"
           >
    </div>
</template>

<script>
/* eslint-disable */
import vSelect from 'vue-select';
import { required, minLength } from "vuelidate/lib/validators";

export default {
  name: "user",
  data() {
    return {
      name: '',
      contactPerson: '',
      place: '',
      contactPersonList: [
        {
          name: "Rekha",
          id: 1
        },
        {
          name: "Karthika",
          id: 2
        }
      ]
    };
  },
  components: {
    vSelect
  },
  methods: {
    save: function() {
      let user = {
        name: this.name,
        contactPerson: this.contactPerson,
        place: this.place
      };
      this.$store.dispatch("updateUser", user);
      this.$store.dispatch("updateAuth", true);
      this.$router.push(`/u/${this.name}`);
    },
    updateString(value) {
      return value && value[0].toUpperCase() + value.slice(1);
    },
    updateContactPerson(value) {
      this.contactPerson = value && value.name;
    }
  },
  validations: {
    name: { required, minLength: minLength(3) },
    place: { required, minLength: minLength(3) },
    contactPerson: { required, minLength: minLength(3) }
  }
};
</script>

<style scoped>
.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.error {
  border-color: red;
  background: #fdd;
}

.error:focus {
  outline-color: #f99;
}

.valid {
  border-color: #5a5;
  background: #efe;
}

.valid:focus {
  outline-color: #8e8;
}

input[type="text"],
select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

input[type="submit"] {
  width: 100%;
  background-color: #4caf50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
}

input[type="submit"]:hover {
  background-color: #45a049;
}

div.form-group {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
  width: 500px;
  position: absolute;
  margin-left: 30rem;
}
</style>

