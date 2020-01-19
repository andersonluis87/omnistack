const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

// index, show, store, update, destroy

module.exports = {
    async index(request, response) {
        const devs = await Dev.find();

        return response.json(devs);
    },
    async store(request, response) {
        const {github_username, techs, latitude, longitude } = request.body;
        
        let dev = await Dev.findOne({github_username});

        if(dev) 
            return response.status(403).send('This user already exists');
        
        
        const githubApiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
        const { name = login, avatar_url, bio} = githubApiResponse.data;
        const techsArray = parseStringAsArray(techs);
        const location = {
            type: 'Point',
            coordinates: [longitude, latitude],
        }
    
        dev = await Dev.create({
            github_username,
            name,
            avatar_url,
            bio,
            techs: techsArray,
            location
        });
    
        return response.json(dev);
    },
    async update(request, response) {
        const github_username = request.params.id;
        const { name, bio, techs } = request.body;

        let dev = await Dev.findOne({github_username});

        if (!dev)
            return response.status(404).send('Dev not found');

        dev.name = name;
        dev.bio = bio;
        dev.techs = parseStringAsArray(techs);

        await dev.save();
        
        return response.status(200).send('Dev updated successfully');   
    },
    async destroy(request, response) {
        const { id } = request.params;
        
        console.log(request.params)

        const dev = await Dev.findById(id);

        console.log(dev);
        
        if (!dev)
            return response.status(404).send('Dev not found');

        await Dev.deleteOne({ _id: id });
        
        return response.status(200).send('Dev removed successfully');
    }
}