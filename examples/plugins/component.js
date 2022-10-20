import Vue from 'vue';
import example from '../views/example';
import configTable from '../views/config-table';

Vue.use({
    install: (V) => {
        V.component(example.name, example);
        V.component(configTable.name, configTable);
    },
});
