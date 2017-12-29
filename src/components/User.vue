<template>
    <div class="form-group" >
       <label for="fname">{{ name ? 'Hello, ' + name[0].toUpperCase() + name.slice(1) : 'Your Name'}}</label>
       <input v-model="name"
            @input="$v.name.$touch"
            :class="{error: $v.name.$error, valid: $v.name.$dirty && !$v.name.$invalid}"
            type="text" id="fname" name="firstname" placeholder="Your name..">
        
       <label for="lname">{{ place ? 'You are from '+ place: 'Where are you from ?'}} </label>
       <input v-model="place"
            @input="$v.place.$touch"
            :class="{error: $v.place.$error, valid: $v.place.$dirty && !$v.place.$invalid}"
            type="text" id="place" name="place" placeholder="Place">
       <label for="lname">You are a {{ position || '?'}}</label>
       <input v-model="position"
            @input="$v.position.$touch"
            :class="{error: $v.position.$error, valid: $v.position.$dirty && !$v.position.$invalid}"
            type="text" id="position" name="position" placeholder="Designation">
       
       <input type="submit" value="Proceed" @click="save" 
           :style="{'background-color': $v.$invalid ? 'red' : 'green'}"
           :class="{'disabled': $v.$invalid}"
           :disabled="$v.$invalid"
           >
    </div>
</template>

<script>
/* eslint-disable */
import { required, minLength } from 'vuelidate/lib/validators';

export default {
  name: 'user',
  data() {
    return {
      name: '',
      position: '',
      place: ''
    }
  },
  methods: {
    save: function() {
      let user = {
          name: this.name,
          position: this.position,
          place: this.place
      };
      this.$router.push(`/u/${this.name}`);
      return;
    }
  },
  validations: {
    name: { required, minLength: minLength(3)},
    place: { required, minLength: minLength(3)},
    position: { required , minLength: minLength(3) }
  }
}
</script>

<style scoped>

.disabled {
    opacity: 0.6;
    cursor: not-allowed;
}
.error {
  border-color: red;
  background: #FDD;
}

.error:focus {
  outline-color: #F99;
}

.valid {
  border-color: #5A5;
  background: #EFE;
}

.valid:focus {
  outline-color: #8E8;
}

input[type=text], select {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

input[type=submit] {
    width: 100%;
    background-color: #4CAF50;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
}

input[type=submit]:hover {
    background-color: #45a049;
}

div.form-group {
    border-radius: 5px;
    background-color: #f2f2f2;
    padding: 20px;
    width: 500px;
    position: absolute;
    margin-left: 30rem
}


</style>

