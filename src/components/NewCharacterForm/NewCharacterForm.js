import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createNewChar, guestCreateChar } from "../../redux/slices/currentUser";
import { v4 as uuidv4 } from "uuid";
import { allCharClasses } from "../../redux/slices/utility/charactersUtil";

export const NewCharacterForm = (props) => {
  const newCharacterSchema = Yup.object().shape({
    character_name: Yup.string()
      .max(15, "Character Name must be less than 15 characters")
      .required("Character Name is required"),
  });
  const dispatch = useDispatch();
  const { current_user } = useSelector((state) => state.currentUser);
  return (
    <div className="NewCharacter-container">
      <div className="classes-banner" />
      <Formik
        initialValues={{
          character_name: "",
          character_class: "Amazon",
        }}
        onSubmit={(values, { resetForm }) => {
          const charId = uuidv4();
          let user_id = null;
          if (current_user) {
            user_id = current_user.user_id;
          }

          const selected_class = allCharClasses.find(
            (c) => c.character_class === values.character_class
          );

          const sortSkillTrees = selected_class.skills.skill_trees.sort(
            (a, b) => a.tree_id - b.tree_id
          );

          const new_char = {
            character_id: charId,
            character_name: values.character_name,
            ...selected_class,
            sortSkillTrees,
          };
          if (user_id) {
            dispatch(
              createNewChar({
                user_id: user_id,
                new_char: new_char,
              })
            );
          } else {
            dispatch(guestCreateChar(new_char));
          }
          resetForm();
        }}
        validationSchema={newCharacterSchema}
      >
        {({ errors, values }) => (
          <Form className="NewCharacterForm">
            <Field
              className="planner-form-text-input"
              name="character_name"
              placeholder="New Character Name"
            />
            {errors.character_name ? (
              <div className="form-error">Character name is required</div>
            ) : null}
            <Field
              className="planner-form-text-input"
              name="character_class"
              as="select"
            >
              <option value="Amazon">Amazon</option>
              <option value="Assassin">Assassin</option>
              <option value="Barbarian">Barbarian</option>
              <option value="Druid">Druid</option>
              <option value="Necromancer">Necromancer</option>
              <option value="Paladin">Paladin</option>
              <option value="Sorceress">Sorceress</option>
            </Field>

            <button className="planner-form-submit-button" type="submit">
              create
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
