require('@babel/register')({
    extensions: ['.ts', '.js', '.tsx', '.jsx'],
    plugins: [
        [
            'babel-plugin-transform-require-ignore-assign',
            {
                extensions: ['.svg']
            }
        ]
    ]
});

const enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
const chaiEnzyme = require('chai-enzyme');

enzyme.configure({ adapter: new Adapter() });
chai.use(chaiEnzyme());
chai.use(chaiAsPromised);
