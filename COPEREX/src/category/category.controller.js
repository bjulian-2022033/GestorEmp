'use strict'

import Category  from './category.model.js'

export const saveCategory = async(req, res) => {
    try{

        let data = req.body
        let category = new Category(data)
        await category.save()
        return res.send({ message: 'Category save succesfully'})

    }catch(err){
        console.error(err)
        return res.status(500).send({ message: 'Error save category', err})
    }
}


export const categoryUpdate = async (req, res) => {
    try {
        let { id } = req.params
        let data = req.body
        let updateCategory = await Category.findOneAndUpdate(

            { _id: id },
            data,
            { new: true }

        )
        if (!updateCategory) return res.status(401).send({ message: 'Category not found and not updated' })
        return res.send({ msg: 'Update category', updateCategory })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Errror updating category', err })
    }
}

export const deleteC = async (req, res) => {
    try {

        let { id } = req.params
        let deletedCategory = await Category.findOneAndDelete({ _id: id })
        if(!deletedCategory) return res.status(404).send({ message: 'Category not found and not delete'})
        return res.send({message: 'Category delete successfully'})

    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error deleting category', err})
    }
}

export const getCategory = async(req, res) => {
    try{

        let categorys = await Category.find({})
        if(categorys.length == 0) return res.status(404).send({ message: 'No category found'}) 
        return res.send({categorys})

    }catch(err){
        console.error(err)
        return res.status(500).send({ message: 'Error gettind category ', err})
    }
}
