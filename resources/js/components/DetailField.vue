<template>
  <div class="md:py-3">
    <h4 class="font-normal mb-2">{{ field.name }}</h4>
    <div v-if="fieldValue" class="text-90" style="display:block;">
      <div v-if="field.isMultiple" class="searchable-select-multiple">
        <div v-for="resource of resources">
          <a v-bind:href="'/nova/resources/products/' + resource.id" v-if="resource.availability"
             class="searchable-select__product">
            <label>{{ resource.display }}</label>
            <img v-if="resource.image_url" class="searchable-select-img" :src="resource.image_url">
            <div>
              <div class="text-70"><em>{{ resource.availability }}</em></div>
              <div class="text-70"><em>{{ resource.visible ? 'visible' : 'invisible' }}</em></div>
            </div>
          </a>
          <div v-else>
            {{ resource.display }}
            <img v-if="resource.image_url" class="searchable-select-img" :src="resource.image_url">
          </div>
        </div>
      </div>
      <div v-else>{{ fieldValue }}</div>
    </div>
    <div v-else>&mdash;</div>
  </div>
</template>
<style>

.searchable-select-multiple {
  display: flex;
  flex-wrap: wrap;
  grid-gap: 0.5rem;
}

.searchable-select__product {
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  width: 125px;
  cursor: pointer;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
}

.searchable-select__product label {
  height: 2.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
}

.searchable-select__product img {
  width: 100%;
  height: 120px;
  object-fit: cover;
}
</style>

<script>
export default {
  props: ['resource', 'resourceName', 'resourceId', 'field'],
  data() {
    return {
      resources: []
    }
  },
  mounted() {
    if (this.field.isMultiple) {
      this.getAvailableResources()
    }
  },
  computed: {
    resourceLabels() {
      let values = []
      this.resources.forEach(r => values.push(r.display))
      return values
    },
    fieldValue() {
      if (
          this.field.value === '' ||
          this.field.value === null ||
          this.field.value === undefined ||
          this.field.value === '[]'
      ) {
        return false
      }

      return String(this.field.value)
    }
  },
  methods: {
    getAvailableResources() {
      return Nova.request()
          .get(
              `/nova-vendor/searchable-select/${this.field.searchableResource}`,
              {
                params: {
                  label: this.field.label,
                  labelPrefix: this.field.labelPrefix,
                  value: this.field.valueField,
                  searchable: this.field.searchable == true ? 1 : 0,
                  use_resource_ids: this.field.isMultiple,
                  resource_ids: this.field.value
                }
              }
          )
          .then(response => {
            // Turn off initializing the existing resource after the first time
            this.resources = response.data.resources
          })
    }
  }
}
</script>
